import React, { useState, useEffect, useRef } from 'react';

interface ListProps<T> {
    items: OptionType[];
    itemHeight: number;
    height: number;
    width: string | number;
    renderItem: (item: OptionType, index: number) => React.ReactNode;
    highlightedIndex: number;
}

export function List<T>({
           items,
           itemHeight,
           height,
           width,
           renderItem,
           highlightedIndex,
       }: ListProps<T>) {
    const [scrollTop, setScrollTop] = useState(0);
//@ts-ignore
    const outerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (outerRef.current) {
                setScrollTop(outerRef.current.scrollTop);
            }
        };

        outerRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            outerRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (outerRef.current && highlightedIndex >= 0) {
            const highlightedItemOffset = highlightedIndex * itemHeight;
            const scrollBottom = scrollTop + height;

            if (highlightedItemOffset < scrollTop) {
                outerRef.current.scrollTop = highlightedItemOffset;
            } else if (highlightedItemOffset + itemHeight > scrollBottom) {
                outerRef.current.scrollTop = highlightedItemOffset - height + itemHeight;
            }
        }
    }, [highlightedIndex, itemHeight, height]);

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(height / itemHeight),
        items.length
    );

    const innerHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;

    if (!items.length) {
        return (
            <div className='py-1.5 px-2 cursor-pointer'>
                No options
            </div>
        )
    }

    return (
        <div
            ref={outerRef}
            style={{ height, width, overflow: 'auto' }}
            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
            <div style={{ height: innerHeight, position: 'relative' }}>
                <div style={{ position: 'absolute', top: offsetY, width: '100%' }}>
                    {items.slice(startIndex, endIndex).map((item, index) =>
                        renderItem(item, startIndex + index)
                    )}
                </div>
            </div>
        </div>
    );
}

