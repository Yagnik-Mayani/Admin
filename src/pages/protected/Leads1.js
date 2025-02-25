import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Leads1 from '../../features/leads1'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Forms"}))
      }, [])


    return(
        <Leads1 />
    )
}

export default InternalPage