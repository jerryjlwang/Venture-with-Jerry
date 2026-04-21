import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export function CarouselSpacing() {
  return (
    <div className="relative w-full px-4">
      <Carousel>
        <CarouselContent className="-ml-4">
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              1
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              2
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              3
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              4
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              5
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              6
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              7
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="bg-zinc-800 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-800" />
        <CarouselNext className="bg-zinc-800 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-800" />
      </Carousel>
    </div>
  );
}
