import React from 'react';
import {gs} from '@/styles';
import Container from '@/components/Container';
import {TodoSchema} from '@/schemas/todoSchema';
import useCommonStyle from '@/hooks/useCommonStyle';
import {useAppSelector} from '@/hooks/useAppSelector';
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useLazyGetAllTodosQuery,
} from '@/redux/api/todoApi';
import {
  View,
  SectionList,
  SectionListData,
  TouchableOpacity,
  SectionListRenderItem,
} from 'react-native';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CheckBox from 'expo-checkbox';
import HomeHeader from './HomeHeader';
import useTheme from '@/hooks/useTheme';
import {prepareTodos} from './prepareTodos';
import TryAgain from '@/components/TryAgain';
import AvoidingView from '@/components/AvoidingView';
import {HomeSection, NavigationPropsType, StatusCodes} from '@/core/types';
import {ActivityIndicator, TextInput, List, Text} from 'react-native-paper';
import TaskInput from './TaskInput';

const HomeScreen: React.FC<NavigationPropsType<'App'>> = () => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const {colors} = useTheme();

  const commonStyles = useCommonStyle();

  const account = useAppSelector(data => data.auth.account)!;

  const [getTodos, {isLoading, error}] = useLazyGetAllTodosQuery();

  const [addTodo, {isLoading: isAdding}] = useAddTodoMutation();

  const [updateTodo] = useUpdateTodoMutation();

  const [deleteTodo] = useDeleteTodoMutation();

  const [sections, setSections] = React.useState<HomeSection[]>([]);

  const [newTodoValue, setNewTodoValue] = React.useState<string>('');

  const [updatedTodoValue, setUpdateTodoValue] = React.useState<string>('');

  const [selectedTodo, setSelectedTodo] =
    React.useState<Pick<TodoSchema, '_id' | 'description' | 'completed'>>();

  const isNewDisabled = isLoading || isAdding;

  const ListEmptyComponent = React.useMemo(() => {
    return (
      <React.Fragment>
        <Text
          variant="bodyLarge"
          style={[gs.textCenter, gs.fontBold, commonStyles.mt10]}>
          Your to-do list is currently empty! 🎉
        </Text>
        <Text
          variant="bodyMedium"
          style={[
            gs.textCenter,
            gs.fontSemiBold,
            commonStyles.mt10,
            {
              color: colors.secondText,
            },
          ]}>
          Tap the "+" button to add your first task and stay organized.
        </Text>
      </React.Fragment>
    );
  }, [colors.secondText, commonStyles.mt10]);

  const keyExtractor = (item: TodoSchema) => {
    return item._id;
  };

  const onGetTodos = React.useCallback(async () => {
    try {
      const {data, status} = await getTodos().unwrap();

      if (status === StatusCodes.OK) {
        if (data.length === 0) {
          return;
        }
        const {uncompletedTodos, completedTodos} = prepareTodos(data);

        setSections([
          {title: '', data: uncompletedTodos},
          {title: 'Completed', data: completedTodos},
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getTodos]);

  const onAddTodoPress = React.useCallback(async () => {
    try {
      const description = newTodoValue.trim();

      if (!description) {
        return;
      }
      const {data, status} = await addTodo({description}).unwrap();

      if (status === StatusCodes.CREATED) {
        const newTodo = data;
        setNewTodoValue('');
        setSections(prevSections => {
          const completedData = prevSections?.[1]?.data ?? [];
          const uncompletedData = prevSections?.[0]?.data ?? [];
          const newUncompletedData = [...uncompletedData, newTodo];
          return [
            {title: '', data: newUncompletedData},
            {title: 'Completed', data: completedData},
          ];
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [addTodo, newTodoValue]);

  const onUpdateTodoPress = React.useCallback(
    async (todo: Pick<TodoSchema, '_id' | 'description' | 'completed'>) => {
      const description = todo.description.trim();

      if (!description) {
        return;
      }
      if (selectedTodo?._id === todo._id) {
        bottomSheetRef.current?.close();
      }
      try {
        const {data: updatedTodo, status} = await updateTodo(todo).unwrap();

        if (status === StatusCodes.OK) {
          setSections(prevSections => {
            const allTodos = [...prevSections[0].data, ...prevSections[1].data];

            const updatedTodos = allTodos.map(currentTodo => {
              return currentTodo._id === updatedTodo._id
                ? updatedTodo
                : currentTodo;
            });

            const {uncompletedTodos, completedTodos} =
              prepareTodos(updatedTodos);

            return [
              {title: '', data: uncompletedTodos},
              {title: 'Completed', data: completedTodos},
            ];
          });
        }
      } catch (error) {
        console.error('Failed to update the todo:', error);
      }
    },
    [selectedTodo?._id, updateTodo],
  );

  const onDeleteTodoPress = React.useCallback(
    async (todo: Pick<TodoSchema, '_id' | 'accountId'>) => {
      if (selectedTodo?._id === todo._id) {
        bottomSheetRef.current?.close();
      }
      try {
        const {status} = await deleteTodo(todo).unwrap();

        if (status === StatusCodes.OK) {
          setSections(prevSections => {
            const allTodos = [...prevSections[0].data, ...prevSections[1].data];

            const remainingTodos = allTodos.filter(t => t._id !== todo._id);

            const {uncompletedTodos, completedTodos} =
              prepareTodos(remainingTodos);

            return uncompletedTodos.length === 0 && completedTodos.length === 0
              ? []
              : [
                  {title: '', data: uncompletedTodos},
                  {title: 'Completed', data: completedTodos},
                ];
          });
        }
      } catch (error) {
        console.error('Failed to delete the todo:', error);
      }
    },
    [deleteTodo, selectedTodo?._id],
  );

  const onBottomSheetDismiss = () => {
    setUpdateTodoValue('');
    setSelectedTodo(undefined);
  };

  const onEditIconPress = React.useCallback((todo: TodoSchema) => {
    setSelectedTodo(todo);
    setUpdateTodoValue(todo.description);
    bottomSheetRef.current?.present();
  }, []);

  const onEditTodo = () => {
    onUpdateTodoPress({
      ...selectedTodo!,
      description: updatedTodoValue,
    });
  };

  const renderItem: SectionListRenderItem<TodoSchema> = ({item}) => {
    const {_id, completed, description} = item;

    const color = completed ? colors.theme : undefined;

    return (
      <List.Item
        title={description}
        style={[
          commonStyles.px12,
          {
            backgroundColor: colors.surface,
          },
        ]}
        titleStyle={completed && gs.lineThrough}
        left={() => (
          <CheckBox
            color={color}
            value={completed}
            style={gs.selfCenter}
            onValueChange={() => {
              onUpdateTodoPress({
                _id,
                description,
                completed: !completed,
              });
            }}
          />
        )}
        right={() => (
          <View style={[gs.row, commonStyles.gapX10]}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onEditIconPress(item)}>
              <List.Icon icon="circle-edit-outline" color={colors.sky} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                onDeleteTodoPress({
                  _id,
                  accountId: account._id,
                });
              }}>
              <List.Icon icon="trash-can-outline" color={colors.secondText} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  const renderSectionHeader = React.useCallback(
    ({section}: {section: SectionListData<TodoSchema>}) => {
      return !section.title ? (
        <></>
      ) : (
        <Text
          variant="titleMedium"
          style={[gs.fontSemiBold, commonStyles.py16]}>
          {section.title}
        </Text>
      );
    },
    [commonStyles.py16],
  );

  React.useEffect(() => {
    onGetTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomSheetModalProvider>
      <Container style={[commonStyles.px12, commonStyles.py16]}>
        <BottomSheetModal
          ref={bottomSheetRef}
          enableDismissOnClose
          onDismiss={onBottomSheetDismiss}
          handleStyle={{backgroundColor: colors.flat}}>
          <BottomSheetView
            style={[
              gs.flex,
              commonStyles.py16,
              commonStyles.px12,
              commonStyles.h200,
              {
                backgroundColor: colors.surface,
              },
            ]}>
            <Text style={gs.fontSemiBold} variant="titleLarge">
              Edit
            </Text>
            <View style={[gs.row, commonStyles.mt10, gs.alignCenter]}>
              <TaskInput
                value={updatedTodoValue}
                onSubmitEditing={onEditTodo}
                onChangeText={setUpdateTodoValue}
                placeholder="Enter a new description for the task"
                right={
                  <TextInput.Icon
                    icon="check"
                    color={colors.text}
                    onPress={onEditTodo}
                    disabled={isNewDisabled}
                  />
                }
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        <AvoidingView keyboardVerticalOffset={15} behavior="padding">
          <HomeHeader />
          {isLoading ? (
            <View style={[gs.flex, gs.center]}>
              <ActivityIndicator />
            </View>
          ) : error ? (
            <TryAgain error={error} onRefetchPress={onGetTodos} />
          ) : (
            <SectionList
              windowSize={5}
              sections={sections}
              renderItem={renderItem}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              style={commonStyles.mt10}
              keyExtractor={keyExtractor}
              stickySectionHeadersEnabled
              ListEmptyComponent={ListEmptyComponent}
              renderSectionHeader={renderSectionHeader}
            />
          )}
          <View style={[gs.row, gs.alignCenter]}>
            <TaskInput
              value={newTodoValue}
              placeholder="Add a new task"
              onChangeText={setNewTodoValue}
              onSubmitEditing={onAddTodoPress}
              right={
                <TextInput.Icon
                  icon="plus"
                  color={colors.text}
                  disabled={isNewDisabled}
                  onPress={onAddTodoPress}
                />
              }
            />
          </View>
        </AvoidingView>
      </Container>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
