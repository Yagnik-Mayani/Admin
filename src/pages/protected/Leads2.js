import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Leads2 from '../../features/leads2'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Forms"}))
      }, [])


    return(
        <Leads2 />
    )
}

export default InternalPage