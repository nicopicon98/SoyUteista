import React, { useState } from 'react';
import { AuthManager } from '../auth/AuthManager';
import { UserAuthResponse } from '../interfaces/AuthUserInterface';
import jwt_decode from 'jwt-decode';
import { GraphManager } from '../graph/GraphManager';
import { blobToBase64 } from '../helpers/blobToBase64';
import { Capitalize } from '../helpers/Capitalize';

export const useAccess = () => {
  const [state, setState] = useState({
    userLoading: true,
    userFirstName: '',
    userFullName: '',
    userEmail: '',
    userPhoto: " ",
    userToken: ""
  });

  const access = async () => {
    try {
      //obtengo el token de AuthManager
      const token: any = await AuthManager.getAccessTokenAsync();
      //decodeo el token para obtener el user que necesito
      const user: UserAuthResponse = jwt_decode(token!);
      //obtengo la imagen (el tipo de archivo recibido es Blob)
      const userPhotoXd: Blob = await GraphManager.getPhotoAsync();
      //convertimos de blob a base64
      const answerBase64: any = await blobToBase64(userPhotoXd);
      //extraemos la informacion necesaria para pasarle a la imagen avatar
      const photo: string[] = answerBase64.split(',');

      setState({
        userLoading: false,
        userFirstName: Capitalize(user.given_name),
        userFullName: Capitalize((user.name).replace(/\s+/g, ' ')),
        userEmail: user.upn || user.unique_name!,
        userPhoto: photo[1],
        userToken: token
      });

    } catch (error) {
      console.log(error);
    }
  }
  return {
    access,
    state
  }
}
