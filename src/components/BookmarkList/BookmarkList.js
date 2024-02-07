// import Bookmark from '../Bookmark/Bookmark'

// export default function BookmarkList ({
//   bookmarks,
//   updateBookmark,
//   deleteBookmark
// }) {
//   return (
//     <ul>
//       {
//             bookmarks.length
//               ? bookmarks.map(bookmark => (
//                 <Bookmark
//                   key={bookmark._id}
//                   bookmark={bookmark}
//                   updateBookmark={updateBookmark}
//                   deleteBookmark={deleteBookmark}
//                 />
//               ))
//               : <>
//                 <h2>No Bookmarks Yet... Add one in the Form Above</h2>
//                 </>
//         }
//     </ul>
//   )
// }
import React from 'react'
import Bookmark from '../Bookmark/Bookmark'
import './../../App.css'
import {Item} from '../SortableItem/SortableItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function BookmarkList({ bookmarks, setBookmarks }) {
  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setBookmarks((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
  return (
    <div className='card-grid'>
            <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Container className="p-3" style={{"width": "50%"}} align="center">
        <h3>The best programming languages!</h3>
        <SortableContext
          items={bookmarks}
          strategy={verticalListSortingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {bookmarks.map(bookmark => <Item key={bookmark} id={bookmark.id}/>)}
        </SortableContext>
      </Container>
    </DndContext>

      {bookmarks.map(bookmark => {
        return <Bookmark bookmark={bookmark} key={bookmark._id} />
      })}
    </div>
  )
}
