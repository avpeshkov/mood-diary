import React from "react";
import { MoodObject } from "modules/MoodHistory/types";
import { MoodView } from "modules/MoodHistory/components/MoodView";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface MoodListViewProps {
    moodList: MoodObject[];
    editMoodObject?: (moodId: string) => void;
    deleteMoodRequest?: (moodId: string) => void;
}

class MoodListView extends React.Component<MoodListViewProps> {
    row = ({ index, style }: { index: number; style: React.CSSProperties }): JSX.Element => {
        const { moodList, editMoodObject, deleteMoodRequest } = this.props;
        return (
            <MoodView
                moodObject={moodList[index]}
                key={`${index}-${moodList[index].id}`}
                editMoodObject={editMoodObject}
                deleteMoodObject={deleteMoodRequest}
                style={style}
            />
        );
    };

    render() {
        return (
            <AutoSizer disableWidth={true}>
                {({ height }) => (
                    <List className="List" height={height} itemCount={this.props.moodList.length} itemSize={150} width={500}>
                        {this.row}
                    </List>
                )}
            </AutoSizer>
        );
    }
}

export default MoodListView;
