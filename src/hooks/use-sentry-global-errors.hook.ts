import {useEffect} from 'react';
import * as Sentry from '@sentry/react-native';

export const useSentryGlobalErrors = () => {
  Sentry.init({
    dsn: 'https://73769704cb3c420d9ba224c87dde4ac8@o4505185706639360.ingest.sentry.io/4505185708736512',
  });

  // Manejo de errores globales
  useEffect(() => {
    const globalErrorHandler = (error: any, isFatal?: boolean) => {
      Sentry.captureException(error);
    };

    ErrorUtils.setGlobalHandler(globalErrorHandler);

    return () => {
      ErrorUtils.setGlobalHandler(ErrorUtils.getGlobalHandler()); // Restablecer el controlador de errores global al original
    };
  }, []);

  return null;
};
