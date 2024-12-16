import {useRStyle} from 'react-native-full-responsive';

const useCommonStyle = () => {
  return useRStyle(() => {
    return {
      mt10: {
        marginTop: '10rs',
      },
      mt15: {
        marginTop: '15rs',
      },
      gapX10: {
        columnGap: '10rs',
      },
      px12: {
        paddingHorizontal: '12rs',
      },
      py16: {
        paddingVertical: '16rs',
      },
      h200: {
        height: '200rs',
      },
    };
  }, []);
};

export default useCommonStyle;
