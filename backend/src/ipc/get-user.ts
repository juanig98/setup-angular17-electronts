import { AppDataSource } from "../database/data-source.js"
import { UserEntity } from "../database/models/User.entity.js"
import { ipcMain } from 'electron';

export const getUsers = async (): Promise<UserEntity[]> => {
    const userRepository = AppDataSource.getRepository(UserEntity)
    return await userRepository.find();
}


export default () => {
   
}