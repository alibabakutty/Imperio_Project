import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import DisplayofMasters from './display/DisplayofMasters'
import AlterofMasters from './alter/AlterofMasters';
import ListofMasters from './create/ListofMasters';

const Master = () => {

    const {master} = useParams();

    const renderComp = () => {
        switch(master){
            case 'list':
                return <ListofMasters />
            case 'display':
                return <DisplayofMasters />
            case 'alter':
                return <AlterofMasters />
                
            default:
                return null;
        }
    }
  return (
    <>
        <div>
            {renderComp()}
        </div>
    
    </>
  )
}

export default Master

Master.propTypes = {
    master:PropTypes.string.isRequired
}