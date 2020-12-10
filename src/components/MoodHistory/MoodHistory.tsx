import React from "react";
import { MoodObject } from "types/mood";
import styled from "@emotion/styled";
import Modal from "react-modal";
import { MoodForm } from "components/MoodForm";
import { deleteMood, getMoodList, postPatchMood } from "api/mood";
import { MoodView } from "components/MoodView";

interface MoodHistoryState {
    moodList: Array<MoodObject>;
    moodObjectToEdit?: MoodObject | null;
}

const MoodHistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 550px;
    align-items: center;
`;

const HeaderButtonsWrapper = styled.div`
    display: inline-flex;
    width: inherit;
    margin-bottom: 20px;
`;

export const AddNewMoodButton = styled.button`
    display: inline-flex;
    background-color: darkgreen;
    border-radius: 5px;
    border: 0px;
    color: white;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    align-self: center;
    position: fixed;
    width: inherit;
`;

/**
 * компонент для оборажения накопленной истории, рендерит компоненты отображения
 * */

export class MoodHistory extends React.Component<{}, MoodHistoryState> {
    state: MoodHistoryState = {
        moodList: [],
        moodObjectToEdit: undefined,
    };

    componentDidMount() {
        this.updateMoodList();
    }

    render() {
        const { moodList, moodObjectToEdit } = this.state;
        return (
            <>
                <MoodHistoryWrapper>
                    <HeaderButtonsWrapper>
                        <AddNewMoodButton onClick={() => this.addEditMoodObject()}>Add new</AddNewMoodButton>
                    </HeaderButtonsWrapper>
                    {moodList.length > 0 ? (
                        moodList.map((item: MoodObject) => <MoodView moodObject={item} key={item.id} updateMoodObject={this.actionWithArray} />)
                    ) : (
                        <span>No data</span>
                    )}
                </MoodHistoryWrapper>
                <Modal
                    id="MoodFormModal"
                    isOpen={moodObjectToEdit !== undefined}
                    onRequestClose={this.clearEditMoodObject}
                    contentLabel={"Add/Edit mood"}
                    onAfterClose={this.clearEditMoodObject}
                    style={{
                        content: {
                            top: "50%",
                            left: "50%",
                            right: "auto",
                            bottom: "auto",
                            marginRight: "-50%",
                            transform: "translate(-50%, -50%)",
                        },
                    }}
                >
                    <MoodForm moodObject={moodObjectToEdit as MoodObject | null} createUpdateMoodObject={this.createUpdateMoodObject} />
                </Modal>
            </>
        );
    }

    // обновляем список записей настроения с бекенда
    updateMoodList = () => {
        getMoodList((updatedData: MoodObject[]) => this.setState({ moodList: updatedData, moodObjectToEdit: undefined }));
    };

    // создаем или обновляем запись настроения в бекенде
    createUpdateMoodObject = (moodObject: MoodObject) => {
        postPatchMood(moodObject, this.updateMoodList);
    };

    // удаляем запись в бекенде
    deleteMoodObject = (moodId: number) => {
        deleteMood(moodId, this.updateMoodList);
    };

    actionWithArray = (moodId: number, action: "edit" | "delete") => {
        if (action == "delete") {
            this.deleteMoodObject(moodId);
        } else {
            this.addEditMoodObject(moodId);
        }
    };

    addEditMoodObject = (moodId?: number) => {
        const { moodList } = this.state;
        let moodObjectToEdit: MoodObject | null = null;
        if (moodId) {
            const index = moodList.findIndex((moodObject: MoodObject) => moodObject.id === moodId);
            if (index !== -1) {
                moodObjectToEdit = moodList[index];
            }
        }
        this.setState({ moodObjectToEdit });
    };

    clearEditMoodObject = () => {
        this.setState({ moodObjectToEdit: undefined });
    };
}
