// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    name: string;
    email: string;
    login: string;
    location: string;
    company: string;
    avatar_url: string;
    html_url: string;
}