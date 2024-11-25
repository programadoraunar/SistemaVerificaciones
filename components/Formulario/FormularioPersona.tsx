"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormularioEgresadoType,
  formularioPersonaSchema,
  FormularioPersonaType,
} from "../../validations/validationSchema";
import cities from "@/utils/dataPaises/dataPaises.json";
import { identificationSolicitanteOptionsFormulario } from "@/constants/options";
import Captcha from "../ui/Captcha";
import toast from "react-hot-toast";

interface FormularioPersonaProps {
  onSubmit: (data: FormularioPersonaType) => void;
}
// Componente para mostrar mensajes de error
const ErrorMessage: React.FC<{ error?: { message?: string } }> = ({
  error,
}) => {
  return error ? <p className="text-red-600 text-sm">{error.message}</p> : null;
};

// Props del formulario
interface FormularioPersonaProps {
  onSubmit: (data: FormularioPersonaType) => void;
}

const FormularioPersona: React.FC<FormularioPersonaProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormularioPersonaType>({
    resolver: zodResolver(formularioPersonaSchema),
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  // Estados de países, regiones y ciudades
  const [paises, setPaises] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener los países únicos del JSON de ciudades
    const countries = Array.from(
      new Set(cities.map((city) => city.country))
    ).sort((a, b) => a.localeCompare(b));
    setPaises(countries);
    setIsLoading(false);
  }, []);

  // Filtrar subcountries según el país seleccionado
  const subcountries = Array.from(
    new Set(
      cities
        .filter((city) => city.country === watch("pais")) // Uso directo de `watch`
        .map((city) => city.subcountry)
    )
  ).sort((a, b) => a.localeCompare(b));

  // Filtrar ciudades según la región seleccionada
  const filteredCities = cities
    .filter(
      (city) =>
        city.country === watch("pais") &&
        city.subcountry === watch("subcountry")
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const handleFormSubmit = (data: any) => {
    if (isCaptchaValid) {
      onSubmit(data); // Envía el formulario solo si el CAPTCHA es válido
    } else {
      toast.error("CAPTCHA INVALIDO");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-5 p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
          {/* Nombres del Solicitante */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nombres del Solicitante
            </label>
            <input
              type="text"
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("nombres")}
            />
            <ErrorMessage error={errors.nombres} />
          </div>

          {/* Apellidos del Solicitante */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Apellidos del Solicitante
            </label>
            <input
              type="text"
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("apellidos")}
            />
            <ErrorMessage error={errors.apellidos} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
          {/* Tipo Identificación del Solicitante */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tipo Identificación del Solicitante
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm cursor-pointer"
              {...register("tipoIdentificacion")}
            >
              <option value="">Seleccione una identificación</option>
              {identificationSolicitanteOptionsFormulario.map(
                (option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
            <ErrorMessage error={errors.tipoIdentificacion} />
          </div>

          {/* Número de Documento */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Número de Documento
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
              {...register("numeroDocumento")}
            />
            <ErrorMessage error={errors.numeroDocumento} />
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
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("telefono")}
            />
            <ErrorMessage error={errors.telefono} />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              {...register("correoElectronico")}
            />
            <ErrorMessage error={errors.correoElectronico} />
          </div>
        </div>

        {/* Select para País */}
        {!isLoading ? (
          <div>
            <label className="text-sm" htmlFor="pais">
              País:
            </label>
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              id="pais"
              {...register("pais")}
              onChange={(e) => {
                setValue("pais", e.target.value);
                setValue("subcountry", ""); // Reset región
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
            <ErrorMessage error={errors.pais} />
          </div>
        ) : (
          <div>Cargando...</div>
        )}

        {/* Select para Región/Subcountry */}
        {watch("pais") && (
          <div>
            <label className="text-sm" htmlFor="subcountry">
              Región/Estado/Departamento:
            </label>
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              id="subcountry"
              {...register("subcountry")}
              onChange={(e) => {
                setValue("subcountry", e.target.value);
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
        {watch("subcountry") && (
          <div>
            <label className="text-sm" htmlFor="city">
              Ciudad:
            </label>
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              id="ciudad"
              {...register("ciudad")}
            >
              <option value="">Selecciona una ciudad</option>
              {filteredCities.map((city) => (
                <option key={city.geonameid} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-center pt-5">
          <Captcha
            validate={(res) => {
              setIsCaptchaValid(res);
            }}
          />{" "}
          {/* Componente CAPTCHA */}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-2 bg-blue-zodiac-950 text-white rounded-md text-center"
            disabled={isSubmitting}
          >
            {isLoading ? "Cargando..." : "Verificar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioPersona;
