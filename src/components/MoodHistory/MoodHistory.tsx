import React from "react";
import { MoodObject } from "types/mood";
import styled from "@emotion/styled";
import { backEndFake } from "./MoodHistoryBackEndFake";
import { MoodView } from "../MoodView";
import Modal from "react-modal";
import { MoodForm } from "../MoodForm";

interface MoodHistoryState {
    moodList: Array<MoodObject>;
    moodObjectToEdit: MoodObject | null;
}

const MoodHistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 550px;
    align-items: center;
`;

export const AddNewMoodButton = styled.button`
    display: inline-flex;
    background-color: darkgreen;
    border-radius: 5px;
    border: 0px;
    color: white;
    width: 30%;
    display: flex;
    align-items: center;
    font-size: 24px;
    align-self: flex-end;
    justify-content: center;
    align-self: center;
`;

// компонент для оборажения накопленной истории
export class MoodHistory extends React.Component<{}, MoodHistoryState> {
    state: MoodHistoryState = {
        moodList: [],
        moodObjectToEdit: null,
    };

    componentDidMount() {
        this.setState({ moodList: backEndFake.moodList });
    }

    render() {
        const { moodList, moodObjectToEdit } = this.state;
        return (
            <>
                <MoodHistoryWrapper>
                    <AddNewMoodButton onClick={() => this.addEditMoodObject()}>Add new</AddNewMoodButton>
                    {moodList.length > 0 ? (
                        moodList.map((item: MoodObject) => <MoodView moodObject={item} key={item.id} updateMoodObject={this.actionWithArray} />)
                    ) : (
                        <span>No data</span>
                    )}
                </MoodHistoryWrapper>
                <Modal
                    id="MoodFormModal"
                    isOpen={Boolean(moodObjectToEdit)}
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
                    <MoodForm moodObject={moodObjectToEdit} createUpdateMoodObject={this.createUpdateMoodObject} />
                </Modal>
            </>
        );
    }

    actionWithArray = (moodId: number, action: "edit" | "delete") => {
        if (action == "delete") {
            this.deleteMoodObject(moodId);
        } else {
            this.addEditMoodObject(moodId);
        }
    };

    deleteMoodObject = (moodId: number) => {
        this.setState((state: MoodHistoryState) => {
            return { moodList: state.moodList.filter((moodObject: MoodObject) => moodObject.id !== moodId) };
        });
    };

    addEditMoodObject = (moodId?: number) => {
        const { moodList } = this.state;
        let moodObjectToEdit: MoodObject | null = null;
        if (moodId) {
            const index = moodList.findIndex((moodObject: MoodObject) => moodObject.id === moodId);
            if (index !== -1) {
                moodObjectToEdit = moodList[index];
            }
        } else {
            moodObjectToEdit = { date: new Date(), mood: 5, comment: "" };
        }
        this.setState({ moodObjectToEdit });
    };

    createUpdateMoodObject = (moodObject: MoodObject) => {
        this.setState((state: MoodHistoryState) => {
            const { moodList } = state;
            if (moodObject.id) {
                const index = moodList.findIndex((mood: MoodObject) => mood.id === moodObject.id);
                if (index !== -1) {
                    moodList[index] = moodObject;
                }
            } else {
                moodList.push({
                    ...moodObject,
                    id: moodList.length ? Math.max(...moodList.map((mood: MoodObject) => (mood.id ? mood.id : 0))) + 1 : 1,
                });
            }
            return { moodList, moodObjectToEdit: null };
        });
    };

    clearEditMoodObject = () => {
        this.setState({ moodObjectToEdit: null });
    };
}
