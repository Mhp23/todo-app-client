import React from 'react';
import {gs} from '@/styles';
import {View} from 'react-native';
import useTheme from '@/hooks/useTheme';
import {Text, IconButton} from 'react-native-paper';
import {useLogoutMutation} from '@/redux/api/authApi';
import {useAppSelector} from '@/hooks/useAppSelector';

const HomeHeader: React.FC = () => {
  const {colors, mode, changeMode} = useTheme();

  const [logout] = useLogoutMutation();

  const account = useAppSelector(data => data.auth.account)!;

  const onToggleTheme = () => {
    changeMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[gs.row, gs.justifyBetween, gs.alignCenter]}>
      <View style={[gs.row, gs.alignCenter]}>
        <Text variant="displaySmall" style={gs.fontBold}>
          Hi{' '}
          <Text style={[gs.fontBold, {color: colors.theme}]}>
            {account.username}!
          </Text>
        </Text>
        <IconButton
          size={26}
          onPress={onToggleTheme}
          icon={
            mode === 'light' ? 'moon-waning-crescent' : 'white-balance-sunny'
          }
        />
      </View>
      <IconButton
        size={30}
        style={gs.selfCenter}
        icon="location-exit"
        onPress={() => logout({_id: account._id})}
      />
    </View>
  );
};

export default HomeHeader;
