package models

type Post struct {
	Anymtype    int    `json:"anymtype" bson:"anymtype"`
	Name        string `json:"name,omitempty" bson:"name,omitempty"`
	RegNo       string `json:"regno,omitempty" bson:"regno,omitempty"`
	Email       string `json:"email,omitempty" bson:"email,omitempty"`
	Gradyr      int    `json:"gradyr" bson:"gradyr"`
	IssueType   string `json:"issuetype" bson:"issuetype"`
	Description string `json:"description" bson:"description"`
}
