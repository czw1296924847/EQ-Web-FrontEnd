import {Modal, Button} from 'antd';
import FeatureDist from "../dist/FeatureDist";
import "../information/Information.css";
import {Trans_FeatureList, WIDTH_MODAL} from "../func";


const DistModal = ({data, feature, open, onCancel, onClick, la}) => {
    return (
        <Modal
            title={`${Trans_FeatureList(la)[feature]} - ${Trans_FeatureList(la)['value_dist']}`}
            open={open}
            centered
            onCancel={onCancel}
            width={WIDTH_MODAL}
            footer={
                <Button className="FeatureList-Modal-Footer" key="back" onClick={onClick}>
                    {Trans_FeatureList(la)['close']}
                </Button>}>
            <FeatureDist data={data} feature={feature}/>
        </Modal>
    )
}


export default DistModal;
