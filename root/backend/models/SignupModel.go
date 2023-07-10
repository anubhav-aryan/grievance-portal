package models

type SignupUser struct {
	Firstname string `json:"first_name"`
	Lastname  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Role      string `json:"role,omitempty"`
	ID        int    `json:"id,omitempty"`
}
