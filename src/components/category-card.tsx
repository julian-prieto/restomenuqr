import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { type Category } from "@prisma/client";
import clsx from "clsx";
import { type PressEvent } from "@react-types/shared";

type CategoryCardProps = {
  category: Category;
  selected: boolean;
  onClick: (e: PressEvent) => void;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  selected,
  onClick,
}) => {
  return (
    <div>
      <Card
        shadow="none"
        classNames={{
          base: clsx("aspect-square w-[150px] transition duration-550", {
            "bg-slate-100 text-black": !selected,
            "bg-black text-white": selected,
          }),
        }}
        isPressable
        disableRipple
        onPress={onClick}
      >
        <CardBody className="flex items-center justify-center overflow-visible p-0">
          {/* <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={category.name}
          className="h-[140px] w-full object-cover"
          src={category.image}
        /> */}
          <span className="text-7xl">{category.image}</span>
        </CardBody>
        <CardFooter className="justify-center text-small">
          <b>{category.name}</b>
        </CardFooter>
      </Card>
    </div>
  );
};
