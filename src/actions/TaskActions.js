
import axiosInstance from '../axiosInstance';

export const getTasks = () => async (dispatch) => {
    try {
        const response = await  axiosInstance.get('/tasks');
        dispatch({ type: 'GET_TASKS', payload: response.data });
  
    } catch (error) {
        console.error(error);
    }
};

export const addTask = (taskData) => async (dispatch) => {
    try {
        const response = await  axiosInstance.post('/tasks', taskData);
        dispatch({ type: 'ADD_TASK', payload: response.data });
    } catch (error) {
        console.error(error);
    }
};

export const updateTask = (id, taskData) => async (dispatch) => {
    try {
        const response = await  axiosInstance.put(`/tasks/${id}`, taskData);
        dispatch({ type: 'UPDATE_TASK', payload: response.data });
    } catch (error) {
        console.error(error);
    }
};

export const deleteTask = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/tasks/${id}`);
        dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
        console.error(error);
    }
};