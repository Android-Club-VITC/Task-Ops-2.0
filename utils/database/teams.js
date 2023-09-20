import { addDoc, getDocs, updateDoc, where, query } from "firebase/firestore";
import {teams} from '../../auth';


export function createTeam(payload, cb){
    addDoc(teams, {
        teamname: payload.teamname,
        teamcode: payload.teamcode,
        task1: "InComplete",
        task1time: 0,
        task2: "InComplete",
        task2time: 0,
        task3: "InComplete",
        task3time: 0,
        task4: "InComplete",
        task4time: 0,
        task5: "InComplete",
        task5time: 0,
        task6: "InComplete",
        task6time: 0,
        task7: "InComplete",
        task7time: 0,
        task8: "InComplete",
        task8time: 0,
        task9: "InComplete",
        task9time: 0,
        task10: "InComplete",
        task1time: 0,
        score: 0,
        slot: payload.teamslot
    })
    .then(res=>cb({
        "status":"success"
    }))
    .catch(err=>cb({
        "status": "error"
    }))
}

export function getTeam(payload, cb){
    const q = query(teams, where("teamcode", "==", payload.teamcode))
    getDocs(q)
    .then(res=>res.docs)
    .then(res=>{
        const data = res[0].data();
        if(data.password == payload.password){
            cb({data: data, status:"success"});
        }
    })
    .catch(err=>cb({status:"error"}));
}

export function updateTeam(payload, cb){
    const q = query(teams, where("teamcode", "==", payload.teamcode))
    getDocs(q)
    .then(res=>res.docs)
    .then(res=>{
        const data = res[0].ref
        updateDoc(data, payload)
        .then(res=>cb({
            "status":"success"
        }));
    })
    .catch(err=>cb({status:"error"}));
}

export function getTeams(payload, cb){
    const q = query(teams, where("teamcode", "==", payload.teamcode))
    getDocs(q)
    .then(res=>res.docs)
    .then(res=>{
        const data = []
        res.forEach(val=>data.push(val.data()))
        cb({
            status:"success",
            data: data
        })
    })
    .catch(err=>cb({status:"error"}));
}