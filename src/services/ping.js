import Ping from 'react-native-ping';

const ping = async ipAddress => {
  console.log(ipAddress);

  try {
    const ms = await Ping.start(ipAddress, {timeout: 1000});
    return true;
  } catch (error) {
    return false;
  }
};

export default ping;
