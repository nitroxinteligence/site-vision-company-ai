"use client";

import React, { useRef, useState, useCallback } from "react";
import { X, Upload, Paperclip } from "lucide-react";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  initialFiles?: File[];
  maxFiles?: number;
  maxSize?: number; // tamanho máximo do arquivo em bytes
}

export function FileUpload({ onChange, initialFiles = [], maxFiles = 100, maxSize = 10 * 1024 * 1024 }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Converter bytes para uma string legível
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    // Verificar o tamanho do arquivo
    if (file.size > maxSize) {
      setError(`O arquivo ${file.name} excede o tamanho máximo de ${formatFileSize(maxSize)}`);
      return false;
    }

    // Verificar se é uma imagem
    if (!file.type.startsWith("image/")) {
      setError(`O arquivo ${file.name} não é uma imagem válida`);
      return false;
    }

    return true;
  };

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      // Converter FileList para array
      const filesArray = Array.from(newFiles);
      
      // Verificar o número máximo de arquivos
      if (files.length + filesArray.length > maxFiles) {
        setError(`Você pode enviar no máximo ${maxFiles} arquivos`);
        return;
      }

      // Filtrar arquivos válidos
      const validFiles = filesArray.filter(validateFile);
      
      if (validFiles.length > 0) {
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        onChange(updatedFiles);
        setError(null);
      }
    },
    [files, maxFiles, maxSize, onChange]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="file-upload-container">
      {/* Input oculto para seleção de arquivos */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/*"
        multiple
      />

      {/* Área de arrastar e soltar */}
      <div
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "1px dashed #161616",
          borderRadius: "8px",
          padding: "1.5rem",
          textAlign: "center",
          backgroundColor: "#000000",
          cursor: "pointer",
          transition: "border-color 0.3s",
          position: "relative",
          ...(dragActive ? { borderColor: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.05)" } : {})
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              backgroundColor: "rgba(88, 232, 119, 0.1)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Upload size={24} color="#ffffff" />
          </div>
          <div>
            <p style={{ fontWeight: "500", marginBottom: "4px" }}>
              Arraste e solte arquivos ou <span style={{ color: "#ffffff" }}>clique aqui</span>
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}>
              Suporta imagens de até {formatFileSize(maxSize)} (máx. {maxFiles} arquivos)
            </p>
          </div>
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div style={{ color: "#f87171", fontSize: "0.875rem", marginTop: "0.5rem" }}>
          {error}
        </div>
      )}

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div style={{
          backgroundColor: "#000000",
          borderRadius: "8px",
          padding: "1rem",
          marginTop: "1rem",
        }}>
          <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
            {files.length} {files.length === 1 ? "arquivo selecionado" : "arquivos selecionados"}
          </p>
          <div style={{ 
            maxHeight: "200px", 
            overflowY: "auto",
            padding: "0.5rem",
            backgroundColor: "#0a0a0a",
            borderRadius: "8px"
          }}>
            {files.map((file, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem",
                  backgroundColor: "#000000",
                  borderRadius: "6px",
                  marginBottom: "0.5rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Paperclip size={16} color="#ffffff" />
                  <span style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {file.name}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}>
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  style={{
                    backgroundColor: "rgba(255, 75, 75, 0.1)",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <X size={14} color="#ff4b4b" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}