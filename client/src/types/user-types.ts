

  export interface RecordObj{
        id:number,
        name:string,
        position:string,
        score:string,
        level:string;
    }

    export interface IUser{
        id?:any | null,
        username:string,
        email:string,
        password:string,
        roles?:Array<string>
    };
    export interface ProductObj  {
        name: string;
        description: string;
        price: string;
        image: string;
        owner: string;
        _id: string;
    };
    export interface ProfileObj  {
        username: string;
        location:string;
        website?:string ;
        company: any | null;
        phone: any | null;
        birthday: any | null ;
        avatar:any | null;
        // owner: string;
        // _id: string;
    };
    export interface Todo {
        id: string;
        description: string;
        completed: boolean;
      };
    
