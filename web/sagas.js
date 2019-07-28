import 'regenerator-runtime/runtime';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { apply, call, cancel, fork, put, take, select } from 'redux-saga/effects';

import { SITE_ROOT } from './constants';

// import { receiveUser } from './ducks/auth';

// Selectors
const getScheduling = state => state.scheduling;

// Saga functionss
function connect() {
    const socket = io(SITE_ROOT);
    return new Promise(resolve => {
        socket.on('connect', () => {
            console.log('connect');
            resolve(socket);
        });
    });
}
function subscribe(socket) {
    return eventChannel(emitter => {

        const streamStartedHandler = (event) => {
            console.log('stream.started');
            console.log(event);
            emitter({
                event: 'stream.started',
                data: event
            });
        };
        const setblockFundedHandler = (event) => {
            console.log('setblock.funded');
            console.log(event);
            emitter({
                event: 'setblock.funded',
                data: event
            });
        };
        const disconnectHandler = (event) => {
            console.log('disconnect');
            console.log(event);
        };

        socket.on('stream.started', streamStartedHandler);
        socket.on('setblock.funded', setblockFundedHandler);
        socket.on('disconnect', disconnectHandler);

        const unsubscribe = () => {
            console.log('unsubscribe');
            socket.off('stream.started', loginHandler);
            socket.off('setblock.funded', setblockFundedHandler);
            socket.off('disconnect', disconnectHandler);
        };

        return unsubscribe;
    });
}

function* schedulingSaga() {
    const socket = yield call(connect);
    const channel = yield call(subscribe, socket);

    while (true) {
        const payload = yield take(channel);
        console.log('payload client socket');
        console.log(payload);
//         if (payload.event.indexOf('stream.') != -1) {
//             const { loggedInUser } = yield select(getAuth);
// 
//             // Handle incoming message only if it contains the loggedInUser
//             if (loggedInUser && loggedInUser.id == payload.data.receiving_user_id) {
//                 yield put(receiveUser(payload));
//             }
//         }
    }
}

export default function* rootSaga() {
    yield fork(schedulingSaga);
}