package storage

import "github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"

type UserStorage interface {
    GetUsers() ([]models.User, error)           
    CreateUser(user models.User) error   
    GetUserByID(id int) (models.User, error)    
    UpdateUser(user models.User) error          
    DeleteUser(id int) error    
    CheckUserPassword(user models.User) (bool, error)                
}



type PublicationStorage interface {
	CreatePublication(publication models.Publication) error
    GetPublications() ([]models.Publication, error)
    GetAllPublicationsByUserID(userID int) ([]models.Publication, error)
    UpdateLikePublication(publicationID int, userID int) error
    DeletePublication(publicationID int) error
}
