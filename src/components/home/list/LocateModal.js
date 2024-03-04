import {Modal, Button} from 'antd';
import "../information/Information.css";
import {Trans_FeatureList, WIDTH_MODAL} from "../utils";
import SourceLocate from "../locate/SourceLocate";


const LocateModal = ({data, loMin, loMax, laMin, laMax, open, onCancel, onClick, la}) => {
    return (
        <Modal
            title={`${Trans_FeatureList(la)['source_locate']}`}
            open={open}
            centered
            onCancel={onCancel}
            width={WIDTH_MODAL - 50}
            footer={
                <Button className="FeatureList-Modal-Footer" key="back" onClick={onClick}>
                    {Trans_FeatureList(la)['close']}
                </Button>}>
            <SourceLocate data={data} loMin={loMin} loMax={loMax} laMin={laMin} laMax={laMax}/>
        </Modal>
    )
}


export default LocateModal;
