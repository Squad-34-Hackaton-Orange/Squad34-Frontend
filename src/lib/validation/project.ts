export interface ProjectFormValues {
  title: "";
  description: "";
  link: "";
  projectTag: string[];
  image: ""
}

export type ProjectFormErrors = {
  [key: string]: string | string[];
  title: string;
  description: string;
  link: string;
  projectTag: string[];
  image: string;
};

