import { useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from "../common/headerSlice"



function Integration(){

    const dispatch = useDispatch()

    const [integrationList, setIntegrationList] = useState(INITIAL_INTEGRATION_LIST)


    const updateIntegrationStatus = (index) => {
        let integration = integrationList[index]
        setIntegrationList(integrationList.map((i, k) => {
            if(k===index)return {...i, isActive : !i.isActive}
            return i
        }))
        dispatch(showNotification({message : `${integration.name} ${integration.isActive ? "disabled" : "enabled"}` , status : 1}))
    }


    return(
        <>
           
             
        </>
    )
}

export default Integration