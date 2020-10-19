const types = {
  ADDUSER: "ADDUSER",
  SETUSERS: "SETUSERS",
  HEARTBEAT: "HEARTBEAT",
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
        if (Date.now() > value + 10 * 1000) {
          heartBeats.delete(key);
          const index = users.indexOf(key);
          if (index !== -1) users.splice(index, 1);
        }
      });
      return {
        ...state,
        heartBeats,
        users,
      };
    }
    case types.SETUSERS: {
      let users = [...state.users, ...action.payload.value].sort()
      return {
        ...state,
        users: users.filter(function(item, pos) {
          return users.indexOf(item) === pos;
        }),
      };
    }
    case types.ADDUSER: {
      let users = [...state.users];
      if (!users.includes(action.payload.value)) {
        users.push(action.payload.value);
      }
      return {
        ...state,
        users: users.sort(),
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
export const addUser = (value) => {
  return {
    type: types.ADDUSER,
    payload: {
      value,
    },
  };
};
export const setName = (value) => {
  return {
    type: types.SETNAME,
    payload: {
      value,
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

export { types };
