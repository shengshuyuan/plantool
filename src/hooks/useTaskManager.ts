import { useState, useEffect } from 'react';
import type { Task, DailyData, TaskLevel } from '../types';

const STORAGE_KEY = 'plantool_history_v1';

// Helper to get YYYY-MM-DD
const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayString = () => getDateString(new Date());

const createEmptyDay = (dateStr: string): DailyData => ({
  date: dateStr,
  timeBudget: 8,
  tasks: []
});

export const useTaskManager = () => {
  const [currentDate, setCurrentDate] = useState<string>(getTodayString());
  
  // All history data: Record<dateString, DailyData>
  const [history, setHistory] = useState<Record<string, DailyData>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
    return {};
  });

  // Derived current data
  const data = history[currentDate] || createEmptyDay(currentDate);

  // Auto-save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Update helper
  const updateCurrentDay = (updater: (prev: DailyData) => DailyData) => {
    setHistory(prev => ({
      ...prev,
      [currentDate]: updater(prev[currentDate] || createEmptyDay(currentDate))
    }));
  };

  const addTask = (level: TaskLevel) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: '',
      level,
      category: 'work',
      estimatedTime: 0.5,
      actualTime: 0,
      completed: false,
      createdAt: Date.now(),
    };
    updateCurrentDay(day => ({ ...day, tasks: [...day.tasks, newTask] }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    updateCurrentDay(day => ({
      ...day,
      tasks: day.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const deleteTask = (id: string) => {
    updateCurrentDay(day => ({
      ...day,
      tasks: day.tasks.filter(t => t.id !== id)
    }));
  };

  const setBudget = (budget: number) => {
    updateCurrentDay(day => ({ ...day, timeBudget: budget }));
  };

  const updateReview = (review: string) => {
    updateCurrentDay(day => ({ ...day, review }));
  };

  const changeDate = (offset: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    const newDateStr = getDateString(date);
    
    // Don't allow future dates beyond today (optional, but requested logic implies history viewing)
    // The user didn't explicitly forbid future, but "view history" implies looking back.
    // However, planning for tomorrow is a valid use case. 
    // The requirement says "view task records from historical dates". 
    // I will allow future for now as it's a planner, but maybe limit 'Next' button in UI if it's today.
    // Let's stick to the UI logic: Next button disabled if today (implemented in Header).
    
    setCurrentDate(newDateStr);
  };

  return {
    data,
    currentDate,
    addTask,
    updateTask,
    deleteTask,
    setBudget,
    updateReview,
    changeDate,
    isToday: currentDate === getTodayString()
  };
};
