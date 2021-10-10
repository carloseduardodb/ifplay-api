import Teacher from "App/Models/Teacher";

class CreateTeacherService {
    async execute(request){
        const data = request.only(['name', 'email', 'password'])
        try{
            await Teacher.create(data)
        }catch(err){
            return err.message
        }
        return true
    }
}

export default CreateTeacherService;