package storage

import "github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"

type UserStorage interface {
    GetUsers() ([]models.User, error)           
    CreateUser(user models.User) (int, error)   
    GetUserByID(id int) (models.User, error)    
    UpdateUser(user models.User) error          
    DeleteUser(id int) error                    
}

