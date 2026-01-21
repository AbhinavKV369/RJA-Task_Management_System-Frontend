import React, { useContext } from 'react'
import { TaskContext } from './TaskContext'

export const useTask = () => useContext(TaskContext);

