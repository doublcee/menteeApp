import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class GoalService{
    url: string;
    token:string;
    constructor(private http: HttpClient){
       //this.url = 'http://127.0.0.1:8000/api/';
        //this.url = 'http://10.0.2.2:8000/api/'
       this.url = 'http://pursuitofpurposenetwork.com/mobileApp/api/';
    }

    addGoal(goalDesc:string, startDate:string, endDate:string, userID:number, token:string){
        return this.http.post(this.url+'addGoal',{goalDesc:goalDesc, startDate:startDate, endDate:endDate, userID:userID},
                                {headers:{'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    getGoal(userID:number, token:string)
    {
        return this.http.post(this.url+'myGoal', {userID:userID},
                        {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    schedules(userID:number, token:string){
        return this.http.post(this.url+'mySchedules', {userID:userID},
                    {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    processGoal(goalID:number, type:number, userID:number, token:string){
        return this.http.post(this.url+'processGoal',{goalID:goalID,pType:type,userID:userID},
                                {headers:{'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    processGoalRequests(userID:number, goalID:number, type:number, token:string){
        return this.http.post(this.url+'processGoalRequest',{userID:userID,pType:type,goalID:goalID},
            {headers:{'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    getAchievements(token:string){
        return this.http.post(this.url+'getAchievements',{},
            {headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}});
    }

    goalRequests(token:string){
       return this.http.get(this.url+'goalRequests',{headers:{'Content-Type':'application/json', 'Authorization':'Bearer '+token}})
    }
}