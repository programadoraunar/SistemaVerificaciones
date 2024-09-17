import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function SearchHeader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center border mb-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5  bg-white rounded-lg">
      <div className="flex flex-col">
        <Label className="text-base">Numero de Documento</Label>
        <div className="flex">
          <Input></Input>
          <Button>q</Button>
        </div>
      </div>
      <div>
        <p>hola</p>
      </div>
      <div>
        <p>hola</p>
      </div>
      <div>
        <p>hola</p>
      </div>
    </div>
  );
}

export default SearchHeader;
