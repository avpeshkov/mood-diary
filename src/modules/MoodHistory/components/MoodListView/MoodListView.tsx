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

const MoodListView: React.FC<MoodListViewProps> = (props) => {
    const { moodList, editMoodObject, deleteMoodRequest } = props;

    const Row: ({ index, style }: { index: number; style: React.CSSProperties }) => JSX.Element = ({ index, style }) => (
        <MoodView
            moodObject={moodList[index]}
            key={`${index}-${moodList[index].id}`}
            editMoodObject={editMoodObject}
            deleteMoodObject={deleteMoodRequest}
            style={style}
        />
    );

    return (
        <AutoSizer disableWidth={true}>
            {({ height }) => (
                <List className="List" height={height} itemCount={moodList.length} itemSize={150} width={500}>
                    {Row}
                </List>
            )}
        </AutoSizer>
    );
};
export default MoodListView;
