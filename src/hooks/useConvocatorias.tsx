import React from 'react';
import serviciosAPI from '../api/serviciosAPI';
import {useState} from 'react';
import {useEffect} from 'react';
import {ConvocatoriasInterface} from '../interfaces/ConvocatoriasInterface';

export const useConvocatorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [convocatorias, setConvocatorias] =
    useState<ConvocatoriasInterface[]>();

  const getConvocatorias = async () => {
    const rep = await serviciosAPI.get<ConvocatoriasInterface[]>(
      '/convocatorias',
    );
    setConvocatorias(rep.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getConvocatorias();
  }, []);

  return {
    isLoading,
    convocatorias,
  };
};
