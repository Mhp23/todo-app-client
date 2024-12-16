import React from 'react';
import {gs} from '@/styles';
import {ErrorResponse} from '@/core/types';
import Container from '@/components/Container';
import {Button, Text} from 'react-native-paper';
import useCommonStyle from '@/hooks/useCommonStyle';

const TryAgain: React.FC<{
  error: unknown;
  onRefetchPress: () => void;
}> = ({error, onRefetchPress}) => {
  const styles = useCommonStyle();

  return (
    <Container style={[gs.center]}>
      <Text variant="titleLarge" style={[gs.textCenter, styles.px12]}>
        {(error as ErrorResponse)?.message}
      </Text>
      <Button
        mode="text"
        icon="sync"
        style={styles.mt10}
        onPress={onRefetchPress}>
        Try Again
      </Button>
    </Container>
  );
};

export default TryAgain;
