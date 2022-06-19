import { useState, useEffect, useContext } from 'react'
import horarioAPI from '../api/horarioAPI';
import { horarioInterface, MateriaInterface, Resp} from '../interfaces/horarioInterface';
import { UserContext } from '../context/UserContext';
import jwt_decode from "jwt-decode";

export const useHorario = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [materias, setMaterias] = useState<MateriaInterface[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);

  const { userEmail } = useContext(UserContext);
  const API_KEY = "JSPHPWORKS4ever&ever!";

  const loadMateria = async () => {
    const url = '/signFuk/?payload='+userEmail;
    const JWTsigned = await horarioAPI.get(url);
    const repDefinite = await horarioAPI.get<horarioInterface>(`/schedule/${JWTsigned.data.data}`);
    const rep_decoded: Resp = await jwt_decode(repDefinite.data.data);
    setMaterias(rep_decoded.resp.MATERIAS);
    setIsLoading(false);
  }

  //Disparamos la peticion http
  useEffect(() => {
    console.log("loaded");
    loadMateria();
  }, [])

  return {
    isLoading,
    materias
  }
}
