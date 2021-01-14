import React from "react";
import { MoodObject } from "./types";
import styled from "@emotion/styled";
import Modal from "react-modal";
import MoodApi from "./api";
import { connect } from "react-redux";
import { moodsActions } from "./slice";
import firebase from "firebase";
import { MoodView } from "./components/MoodView";
import { MoodForm } from "./components/MoodForm";

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
    padding-top: 15px;
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

const mapDispatchToProps = {
    addMood: moodsActions.addMood,
    updateMood: moodsActions.updateMood,
    deleteMood: moodsActions.deleteMood,
};

interface MoodHistoryPropsLocal {
    moodList: MoodObject[];
}

type RawMainScreenProps = MoodHistoryPropsLocal & typeof mapDispatchToProps;

interface MoodHistoryState {
    moodObjectToEdit?: MoodObject | null;
    writeError: null | string;
}

class RawMoodHistory extends React.Component<RawMainScreenProps, MoodHistoryState> {
    state: MoodHistoryState = {
        moodObjectToEdit: undefined,
        writeError: null,
    };

    render() {
        const { moodObjectToEdit } = this.state;
        const { moodList } = this.props;
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

    // создаем или обновляем запись настроения в бекенде
    createUpdateMoodObject = (moodObject: MoodObject) => {
        const { addMood, updateMood } = this.props;
        const storeAction = moodObject.id ? updateMood : addMood;
        MoodApi.postPatchMood(moodObject)
            .then((moodResponse: firebase.database.DataSnapshot | undefined) => {
                this.setState({ moodObjectToEdit: undefined, writeError: null }, () => {
                    const moodObjectToUpdate: MoodObject = moodResponse ? { ...moodObject, id: moodResponse.key as string } : moodObject;
                    storeAction(moodObjectToUpdate);
                });
            })
            .catch((error: Error | null) => {
                this.setState({ writeError: error && error.message, moodObjectToEdit: null });
            });
    };

    // удаляем запись в бекенде
    deleteMoodObject = (moodId: string) => {
        MoodApi.deleteMood(moodId)
            .then(() => {
                this.setState({ moodObjectToEdit: undefined }, () => {
                    this.props.deleteMood(moodId);
                });
            })
            .catch((error: Error | null) => {
                this.setState({ writeError: error && error.message, moodObjectToEdit: null });
            });
    };

    actionWithArray = (moodId: string, action: "edit" | "delete") => {
        if (action == "delete") {
            this.deleteMoodObject(moodId);
        } else {
            this.addEditMoodObject(moodId);
        }
    };

    addEditMoodObject = (moodId?: string) => {
        const { moodList } = this.props;
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

export const MoodHistory = connect(undefined, mapDispatchToProps)(RawMoodHistory);
