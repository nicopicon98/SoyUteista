import React from 'react';
import {useState, useEffect} from 'react';
import serviciosAPI from '../api/serviciosAPI';
import { DirectorioEscolarInterface, InfoDependencia } from '../interfaces/DirectorioEscolarInterface';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<DirectorioEscolarInterface[]>();

  const getDirectorios = async () => {
    const directorioPromise =
      await serviciosAPI.get<DirectorioEscolarInterface[]>(`/dependencias`);
    setState(directorioPromise.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDirectorios();
  }, []);

  return {
    state,
    isLoading
  };
};
