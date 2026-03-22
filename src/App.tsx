import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { atom, useAtom, useAtomValue } from "jotai";

type Draggable = {
  id: string;
  src: string;
  dz?: string;
};
type DropZone = {
  id: string;
  draggables: string[];
};

const defaultDraggables: Draggable[] = [
  { id: crypto.randomUUID(), src: "GolemCard.png" },
  { id: crypto.randomUUID(), src: "MegaKnight.png" },
  { id: crypto.randomUUID(), src: "BabyDragonCard.png" },
  { id: crypto.randomUUID(), src: "BarbariansCard.png" },
  { id: crypto.randomUUID(), src: "BomberCard.png" },
  { id: crypto.randomUUID(), src: "DarkPrinceCard.png" },
  { id: crypto.randomUUID(), src: "ElixirGolemCard.png" },
  { id: crypto.randomUUID(), src: "MinerCard.png" },
  { id: crypto.randomUUID(), src: "PEKKACard.png" },
  { id: crypto.randomUUID(), src: "RagingPrinceCard.png" },
  { id: crypto.randomUUID(), src: "SkeletonsCard.png" },
];

const defaultDropZone: DropZone[] = [
  { id: "S", draggables: [] },
  { id: "A", draggables: [] },
  { id: "B", draggables: [] },
  { id: "C", draggables: [] },
  { id: "D", draggables: [] },
  { id: "free", draggables: defaultDraggables.map((d) => d.id) },
];

const dropZoneIds = defaultDropZone.map((dz) => dz.id);

const activeDraggableAtom = atom<Draggable>();

export default function App() {
  const [draggables] = useState(defaultDraggables);
  const [dropZones, setDropZones] = useState<DropZone[]>(defaultDropZone);
  const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

  const handleDragStart = (e: DragStartEvent) => {
    const activeDraggable = draggables.find((d) => d.id === e.active.id);
    setActiveDraggable(activeDraggable);
  };

  const handleDragOver = (e: DragOverEvent) => {
    if (!e.over || !activeDraggable) return;

    const overId = e.over.id as string;
    const activeDraggableId = e.active.id as string;
    const currentDropZone = dropZones.find((dz) =>
      dz.draggables.some((d) => d === activeDraggableId),
    );
    if (!currentDropZone) return;
    const currentDropZoneId = currentDropZone.id;

    setDropZones((prev) => {
      //case 1: if we are hovering the empty space in a Dropzone
      if (dropZoneIds.includes(overId)) {
        const dropZone = prev.find((dz) => dz.id === overId)!;

        const newDraggales = [
          ...dropZone.draggables.filter((d) => d !== activeDraggableId),
          activeDraggableId,
        ];

        return prev.map((dz) => {
          //If not the old or new, just return
          if (dz.id !== overId && dz.id !== currentDropZoneId) return dz;
          // Reomove from the old one if we move across zones
          if (dz.id === currentDropZoneId && currentDropZoneId !== overId)
            return {
              ...dz,
              draggables: dz.draggables.filter((d) => d !== activeDraggableId),
            };

          //Add to new one
          return { ...dz, draggables: newDraggales };
        });
      }
      // case 2: re arranging items in same row
      else if (currentDropZone.draggables.some((d) => d === overId)) {
        const oldIndex = currentDropZone.draggables.findIndex(
          (d) => d === activeDraggableId,
        );
        const newIndex = currentDropZone.draggables.findIndex(
          (d) => d === overId,
        );

        if (oldIndex === newIndex) return prev;

        const newDraggables = arrayMove(
          currentDropZone.draggables,
          oldIndex,
          newIndex,
        );

        return prev.map((dz) => {
          if (dz.id !== currentDropZoneId) return dz;
          return { ...dz, draggables: newDraggables };
        });
      }
      //case 3: re arranging between two different dropzones
      else if (!currentDropZone.draggables.some((d) => d === overId)) {
        const newDropZone = dropZones.find((dz) =>
          dz.draggables.some((d) => d === overId),
        );
        if (!newDropZone) return prev;
        const overIndex = newDropZone.draggables.findIndex((d) => d === overId);
        const newDraggables = newDropZone.draggables.toSpliced(
          overIndex,
          0,
          activeDraggableId,
        );

        return prev.map((dz) => {
          // if not the new OR old dropZone, just retun as it is
          if (dz.id !== currentDropZoneId && dz.id !== newDropZone.id)
            return dz;
          // remove from old one
          else if (dz.id === currentDropZoneId)
            return {
              ...dz,
              draggables: dz.draggables.filter((d) => d !== activeDraggableId),
            };

          // Add to new
          return { ...dz, draggables: newDraggables };
        });
      }

      return prev;
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
    setActiveDraggable(undefined);
  };
  const freeDropZone = dropZones.find((dz) => dz.id === "free");
  if (!freeDropZone) return;

  return (
    <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="w-full">
          {dropZones
            .filter((dz) => dz.id !== "free")
            .map((dropZone) => {
              return <DropZone dropZone={dropZone} key={dropZone.id} />;
            })}
        </div>
        <FreeDropZone dropZone={freeDropZone} />
        <DragOverlay>
          {activeDraggable && (
            <DraggableContent draggable={activeDraggable} isDragging={true} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function DropZone({ dropZone }: { dropZone: DropZone }) {
  const { id, draggables } = dropZone;
  const { setNodeRef } = useDroppable({
    id,
  });

  const bgColor = dropZoneColors[id as keyof typeof dropZoneColors];

  return (
    <div className="border-2 rounded-lg border-white bg-[#333] h-30 w-full flex">
      <div
        className="w-30 flex justify-center items-center text-4xl font-semibold text-black"
        style={{ backgroundColor: bgColor }}
      >
        {id}
      </div>
      <div className="flex gap-4">
        <SortableContext items={draggables}>
          {draggables?.map((draggableId) => {
            const newDraggable = defaultDraggables.find(
              (d) => d.id === draggableId,
            );
            if (!newDraggable) return null;
            return <Draggable key={draggableId} draggable={newDraggable} />;
          })}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className=" flex-1" />
    </div>
  );
}
function FreeDropZone({ dropZone }: { dropZone: DropZone }) {
  const { id, draggables } = dropZone;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="border border-[#333] bg-[#333] h-30 w-full flex">
      <div className="flex gap-4">
        <SortableContext items={draggables}>
          {draggables?.map((draggableId) => {
            const newDraggable = defaultDraggables.find(
              (d) => d.id === draggableId,
            );
            if (!newDraggable) return null;
            return <Draggable key={draggableId} draggable={newDraggable} />;
          })}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className=" flex-1" />
    </div>
  );
}

function Draggable({ draggable }: { draggable: Draggable }) {
  const { id } = draggable;
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <button
      className="cursor-pointer"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <DraggableContent draggable={draggable} />
    </button>
  );
}

function DraggableContent({
  draggable,
  isDragging,
}: {
  draggable: Draggable;
  isDragging?: boolean;
}) {
  const { src, id } = draggable;
  const activeDraggableId = useAtomValue(activeDraggableAtom)?.id;
  return (
    <img
      src={`/assets/${src}`}
      alt={id}
      style={{
        opacity: isDragging || activeDraggableId !== id ? 1 : 0.5,
      }}
      className={`max-h-30 aspect-[0.833] object-cover `}
    />
  );
}

const dropZoneColors = {
  S: "rgb(255,127,127)",
  A: "rgb(255,191,127)",
  B: "#FFFF7F",
  C: "rgb(191,255,127)",
  D: "rgb(127,255,127)",
};
