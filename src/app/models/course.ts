
export class Course {
    _id: string;
    title: string;
    description: string;
    instructor: {_id: string,  name: string, email: string};
    regCode: string;
    published: boolean;

}