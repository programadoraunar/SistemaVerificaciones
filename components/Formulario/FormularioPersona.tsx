"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formularioPersonaSchema,
  FormularioPersonaType,
} from "../../validations/validationSchema";
import cities from "@/utils/dataPaises/dataPaises.json";
import { identificationSolicitanteOptionsFormulario } from "@/constants/options";

interface FormularioPersonaProps {
  onSubmit: (data: FormularioPersonaType) => void;
}
type City = {
  name: string;
  country: string;
  subcountry: string;
  geonameid: number;
};
const FormularioPersona: React.FC<FormularioPersonaProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormularioPersonaType>({
    resolver: zodResolver(formularioPersonaSchema),
  });
  // Estado para las selecciones
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedSubcountry, setSelectedSubcountry] = useState<string>("");
  const [paises, setPaises] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Obtener los países únicos del JSON
  useEffect(() => {
    const countries = Array.from(new Set(cities.map((city) => city.country)));
    setPaises(countries);
    setIsLoading(false);
  }, []);

  // Filtrar subcountries (regiones) según el país seleccionado
  const subcountries = Array.from(
    new Set(
      cities
        .filter((city) => city.country === selectedCountry)
        .map((city) => city.subcountry)
    )
  );

  // Filtrar ciudades según la región/estado seleccionado
  const filteredCities = cities.filter(
    (city) =>
      city.country === selectedCountry && city.subcountry === selectedSubcountry
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
          {/* Nombres del Solicitante */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nombres del Solicitante
            </label>
            <input
              type="text"
              className="w-full text-sm  p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("nombres")}
            />
            {errors.nombres && (
              <p className="text-red-600 text-sm">{errors.nombres.message}</p>
            )}
          </div>

          {/* Apellidos del Solicitante */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Apellidos del Solicitante
            </label>
            <input
              type="text"
              className="w-full text-sm  p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("apellidos")}
            />
            {errors.apellidos && (
              <p className="text-red-600 text-sm">{errors.apellidos.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
          {/* Tipo Identificación del Solicitante */}
          <div className="pb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tipo Identificación del Solicitante
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm "
              {...register("tipoIdentificacion")}
            >
              <option disabled>Seleccione una identificación</option>
              {identificationSolicitanteOptionsFormulario.map(
                (option, index) => (
                  <option key={index}>{option}</option>
                )
              )}
            </select>
            {errors.tipoIdentificacion && (
              <p className="text-red-600 text-sm">
                {errors.tipoIdentificacion.message}
              </p>
            )}
          </div>

          {/* Número de Documento */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Número de Documento
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm "
              {...register("numeroDocumento")}
            />
            {errors.numeroDocumento && (
              <p className="text-red-600 text-sm">
                {errors.numeroDocumento.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
          {/* Teléfono */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full text-sm  p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("telefono")}
            />
            {errors.telefono && (
              <p className="text-red-600 text-sm">{errors.telefono.message}</p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full text-sm  p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("correoElectronico")}
            />
            {errors.correoElectronico && (
              <p className="text-red-600 text-sm">
                {errors.correoElectronico.message}
              </p>
            )}
          </div>
        </div>
        {/* Select para País */}
        {!isLoading ? (
          <div>
            <label className="text-sm" htmlFor="country">
              País:{" "}
            </label>
            <select
              className="w-full text-sm"
              id="pais"
              {...register("pais")}
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedSubcountry(""); // Reset región
                setValue("subcountry", ""); // Reset en el formulario
                setValue("ciudad", ""); // Reset ciudad
              }}
            >
              <option value="">Selecciona un país</option>
              {paises.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.pais && (
              <p className="text-red-600 text-sm">{errors.pais.message}</p>
            )}
          </div>
        ) : (
          <div>Cargando...</div>
        )}

        {/* Select para Región/Subcountry */}
        {selectedCountry && (
          <div>
            <label className="text-sm" htmlFor="subcountry">
              Región/Estado/Departamento:{" "}
            </label>
            <select
              className="text-sm"
              id="subcountry"
              {...register("subcountry")}
              value={selectedSubcountry}
              onChange={(e) => {
                setSelectedSubcountry(e.target.value);
                setValue("ciudad", ""); // Reset ciudad
              }}
            >
              <option value="">Selecciona una región</option>
              {subcountries.map((subcountry) => (
                <option key={subcountry} value={subcountry}>
                  {subcountry}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Select para Ciudad */}
        {selectedSubcountry && (
          <div>
            <label className="text-sm" htmlFor="city">
              Ciudad:{" "}
            </label>
            <select className="text-sm" id="ciudad" {...register("ciudad")}>
              <option value="">Selecciona una ciudad</option>
              {filteredCities.map((city) => (
                <option key={city.geonameid} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-2 bg-blue-950 text-white rounded-md text-center"
          >
            Verificar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioPersona;
