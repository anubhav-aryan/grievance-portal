package models

type Post struct {
	Anymtype    int    `json:"anymtype"`
	Name        string `json:"name,omitempty"`
	RegNo       string `json:"regno,omitempty"`
	Email       string `json:"email,omitempty"`
	Gradyr      int    `json:"gradyr"`
	IssueType   string `json:"issuetype"`
	Description string `json:"description"`
}
