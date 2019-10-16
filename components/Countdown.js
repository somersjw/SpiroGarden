import React from 'react';
import CountDown from 'react-native-countdown-component';

const Countdown = () => {
        return (
            <CountDown
                until={6}
                size={30}
                onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: '#229637'}}
                digitTxtStyle={{color: '#FFF'}}
                timeToShow={['S']}
                timeLabels={{s: 'Seconds'}}
                //running={false}
            />
        )
}

export default Countdown




    