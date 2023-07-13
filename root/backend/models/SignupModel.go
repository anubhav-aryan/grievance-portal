package models

type SignupUser struct {
	Firstname string `json:"first_name" bson:"first_name"`
	Lastname  string `json:"last_name" bson:"last_name"`
	Email     string `json:"email" bson:"email"`
	Password  string `json:"password" bson:"password"`
	Role      string `json:"role,omitempty" bson:"role,omitempty"`
}
