import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Leads3 from '../../features/leads3'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Forms"}))
      }, [])


    return(
        <Leads3 />
    )
}

export default InternalPage