"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface InformationStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  clientName?: string;
  formData: FormValues;
}

export function InformationStepForm({ onSave, onNext, submissionId, clientName, formData }: InformationStepFormProps) {
  const [uploadedFilePaths, setUploadedFilePaths] = useState<string[]>(formData.arquivos_base_conhecimento || []);
  
  const { register, handleSubmit, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema.pick({
      casos_de_sucesso: true,
      script_vendas: true,
    })),
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const debouncedSave = useDebouncedCallback((data: Partial<FormValues>) => {
    onSave(data);
  }, 1500);

  useEffect(() => {
    const subscription = watch((value) => {
      debouncedSave(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedSave]);

  const onSubmit = (data: FormValues) => {
    onSave({ ...data, arquivos_base_conhecimento: uploadedFilePaths });
    onNext();
  };

  const handleFilePathsChange = (paths: string[]) => {
    setUploadedFilePaths(paths);
    onSave({ arquivos_base_conhecimento: paths });
  };

  const textareaStyle = { color: "#FFFFFF", padding: "0.75rem", minHeight: "120px", width: "100%", borderRadius: "8px", overflow: "auto" };

  return (
    <div style={{ backgroundColor: "#000000", borderRadius: "0.5rem", padding: "1.5rem", border: "none", maxWidth: "100%" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", background: "linear-gradient(to right, #ffffff, #888888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Informações Adicionais
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Forneça detalhes que possam ajudar a personalizar seu agente.</p>
      </div>

      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="casos_de_sucesso" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Casos de sucesso relevantes</label>
          <Textarea id="casos_de_sucesso" placeholder='Ex: "Cliente conseguiu aposentadoria..."' {...register("casos_de_sucesso")} style={{ ...textareaStyle, minHeight: "150px" }} className="scrollbar" />
        </div>

        <div>
          <label htmlFor="script_vendas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Script</label>
          <Textarea id="script_vendas" placeholder="Você tem um script de vendas ou qualificação? Se sim, insira aqui." {...register("script_vendas")} style={textareaStyle} className="scrollbar" />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Acesso à base de conhecimentos</label>
          <FileUploadDocuments 
            submissionId={submissionId}
            clientName={clientName || 'cliente'}
            initialFilePaths={uploadedFilePaths}
            onFilePathsChange={handleFilePathsChange}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}

interface FileUploadDocumentsProps {
  submissionId: string | null;
  clientName: string;
  initialFilePaths?: string[];
  onFilePathsChange: (paths: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

function FileUploadDocuments({ submissionId, clientName, initialFilePaths = [], onFilePathsChange, maxFiles = 50, maxSize = 10 * 1024 * 1024 }: FileUploadDocumentsProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const sanitizeFolderName = (name: string) => name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

  const validateFile = (file: File): boolean => {
    const fileNameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!fileNameRegex.test(file.name)) {
      setError(`Nome de arquivo inválido: "${file.name}". Use apenas letras, números e hífens.`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`Arquivo ${file.name} excede o tamanho máximo.`);
      return false;
    }
    return true;
  };

  const handleFiles = async (newFiles: FileList | null) => {
    if (!newFiles || !submissionId) return;
    setError(null);
    setUploading(true);

    const filesArray = Array.from(newFiles);
    if (initialFilePaths.length + filesArray.length > maxFiles) {
      setError(`Você pode enviar no máximo ${maxFiles} arquivos.`);
      setUploading(false);
      return;
    }

    const validFiles = filesArray.filter(validateFile);
    if (validFiles.length !== filesArray.length) {
      setUploading(false);
      return;
    }

    const folderPath = `documentos-form-${sanitizeFolderName(clientName)}-${submissionId.substring(0, 8)}`;
    
    const uploadPromises = validFiles.map(file => 
      supabase.storage.from('form-attachments').upload(`${folderPath}/${file.name}`, file)
    );

    const results = await Promise.all(uploadPromises);
    const newPaths: string[] = [];
    results.forEach(result => {
      if (result.error) {
        console.error('Error uploading file:', result.error);
        setError(`Erro ao enviar o arquivo: ${result.error.message}`);
      } else if (result.data) {
        newPaths.push(result.data.path);
      }
    });

    if (newPaths.length > 0) {
      onFilePathsChange([...initialFilePaths, ...newPaths]);
    }
    setUploading(false);
  };

  const removeFile = async (filePath: string) => {
    const { error: deleteError } = await supabase.storage.from('form-attachments').remove([filePath]);
    if (deleteError) {
      console.error("Error deleting file:", deleteError);
      setError("Erro ao remover o arquivo.");
    } else {
      onFilePathsChange(initialFilePaths.filter(p => p !== filePath));
    }
  };

  return (
    <div>
      <input type="file" ref={inputRef} onChange={(e) => handleFiles(e.target.files)} style={{ display: "none" }} accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp,.zip" multiple disabled={uploading} />
      <div onClick={() => !uploading && inputRef.current?.click()} style={{ border: "1px dashed #161616", borderRadius: "8px", padding: "1.5rem", textAlign: "center", cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1 }}>
        <p>{uploading ? "Enviando arquivos..." : "Arraste e solte ou clique para enviar"}</p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}>Máx. {maxFiles} arquivos. Nomes de arquivo simples.</p>
      </div>
      {error && <div style={{ color: "#f87171", fontSize: "0.875rem", marginTop: "0.5rem" }}>{error}</div>}
      {initialFilePaths.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <p>{initialFilePaths.length} arquivos enviados:</p>
          <ul>
            {initialFilePaths.map((path) => (
              <li key={path} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{path.split('/').pop()}</span>
                <button type="button" onClick={() => removeFile(path)} style={{ color: '#ff4b4b', background: 'none', border: 'none' }}>Remover</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}