"use client";
import Card from "@component/components/card";
import { List, lists } from "@component/data/list";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, setDatas] = useState<List[]>(lists);
  const [fruitsAndVegetables, setFruitsAndVegetables] = useState<List[]>([]);
  const handleClick = (value: List) => {
    const existingFruitsAndVegetables = fruitsAndVegetables.find(
      (data) => data.name === value.name
    );
    if (existingFruitsAndVegetables) {
      setFruitsAndVegetables(
        fruitsAndVegetables.filter((data) => data.name !== value.name)
      );
      setDatas([...datas, value]);
      return;
    }
    setFruitsAndVegetables([...fruitsAndVegetables, value]);
    setDatas(datas.filter((data) => data.name !== value.name));
  };

  useEffect(() => {
    if (fruitsAndVegetables.length !== 0) {
      const timers = fruitsAndVegetables.map((data, index) => {
        return setTimeout(() => {
          setFruitsAndVegetables(
            fruitsAndVegetables.filter((list) => list.name !== data.name)
          );
          setDatas([...datas, data]);
        }, (index + 1) * 5000);
      });
      return () => timers.forEach(clearTimeout);
    }
  }, [fruitsAndVegetables, datas]);
  return (
    <div className="w-full h-[100vh] bg-white p-10 flex flex-row gap-5 justify-between ">
      <div className="flex-1 text-black flex flex-col gap-5 items-center justify-start px-5">
        {datas.map((list) => (
          <Card
            onClick={() => handleClick(list)}
            key={list.name}
            name={list.name}
          />
        ))}
      </div>
      <div className="h-full flex-1 flex flex-col gap-5 items-start border border-gray-300">
        <div className="w-full h-10 p-2 bg-gray-200 text-black text-center">
          Fruits
        </div>
        <div className="w-full flex flex-col gap-4 items-center justify-center px-5">
          {fruitsAndVegetables
            .filter((data) => data.type === "Fruit")
            .map((list) => (
              <Card
                onClick={() => handleClick(list)}
                key={list.name}
                name={list.name}
              />
            ))}
        </div>
      </div>
      <div className="h-full flex-1 flex flex-col gap-5 items-start border border-gray-300">
        <div className="w-full h-10 p-2 bg-gray-200 text-black text-center">
          Vegetables
        </div>
        <div className="w-full flex flex-col gap-4 justify-center items-center px-5">
          {fruitsAndVegetables
            .filter((data) => data.type === "Vegetable")
            .map((list) => (
              <Card
                onClick={() => handleClick(list)}
                key={list.name}
                name={list.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
