const types = {
  ADDUSER: "ADDUSER",
  SETUSERS: "SETUSERS",
  HEARTBEAT: "HEARTBEAT",
  SETNAME: "SETNAME",
  SETCURRENTACTION: "SETCURRENTACTION",
  UNSETCURRENTACTION: "UNSETCURRENTACTION",
};

const defaultState = {
  users: [], //all users
  heartBeats: new Map(),
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.HEARTBEAT: {
      let heartBeats = new Map(state.heartBeats);
      let users = [...state.users];
      heartBeats.set(action.payload.value, Date.now());
      heartBeats.forEach((value, key) => {
        if (Date.now() > value + 60 * 1000) {
          console.log("user seems to be dead", key);
          // delete from heartbeats map
          heartBeats.delete(key);
          // delete from users array
          let indexToBeRemoved = -1;
          users.forEach((user, index) => {
            if (user.id === key) {
              indexToBeRemoved = index;
            }
          });
          if (indexToBeRemoved !== -1) {
            users.splice(indexToBeRemoved, 1);
          }
        }
      });
      return {
        ...state,
        heartBeats,
        users,
      };
    }
    case types.SETUSERS: {
      let users = [...state.users];
      action.payload.value.forEach((item) => {
        let userAlreadyExists = false;
        users.forEach((user) => {
          if (user.id === item.id) {
            userAlreadyExists = true;
          }
        });
        if (!userAlreadyExists) users.push(item);
      });

      return {
        ...state,
        users: users.sort((x, y) => {
          return x.id < y.id;
        }),
      };
    }
    case types.ADDUSER: {
      let users = [...state.users];
      let userAlreadyExists = false;
      users.forEach((user) => {
        if (user.id === action.payload.id) {
          userAlreadyExists = true;
        }
      });
      if (!userAlreadyExists)
        users.push({ id: action.payload.id, name: action.payload.name });
      return {
        ...state,
        users: users.sort((x, y) => {
          return x.id < y.id;
        }),
      };
    }
    case types.SETNAME: {
      let users = [...state.users];
      users.forEach((user, index) => {
        if (user.id === action.payload.id) {
          // user.name = action.payload.name;
          users[index].name = action.payload.name;
        }
      });
      return {
        ...state,
        users,
      };
    }
    case types.SETCURRENTACTION: {
      const users = [...state.users];
      users.forEach((user, index) => {
        if (user.id === action.payload.id) {
          // user.name = action.payload.name;
          users[index].currentAction = action.payload.action;
        }
      });
      return {
        ...state,
        users,
      };
    }
    case types.UNSETCURRENTACTION: {
      const users = [...state.users];
      users.forEach((user, index) => {
        if (user.id === action.payload.id) {
          // user.name = action.payload.name;
          users[index].currentAction = "";
        }
      });
      return {
        ...state,
        users,
      };
    }
    default:
      return state;
  }
};

export const setUsers = (value) => {
  return {
    type: types.SETUSERS,
    payload: {
      value,
    },
  };
};
export const addUser = (id, name) => {
  return {
    type: types.ADDUSER,
    payload: {
      id,
      name,
    },
  };
};

export const heartBeat = (value) => {
  return {
    type: types.HEARTBEAT,
    payload: {
      value,
    },
  };
};
export const setName = (id, name) => {
  return {
    type: types.SETNAME,
    payload: {
      id,
      name,
    },
  };
};
export const setCurrentAction = (id, action) => {
  return {
    type: types.SETCURRENTACTION,
    payload: {
      id,
      action,
    },
  };
};
export const unSetCurrentAction = (id) => {
  return {
    type: types.UNSETCURRENTACTION,
    payload: {
      id,
    },
  };
};
export { types };
