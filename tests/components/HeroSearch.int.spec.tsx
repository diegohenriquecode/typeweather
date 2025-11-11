import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroSearch from "@/components/UI/HeroSearch";
import { vi } from "vitest";
import * as cepService from "@/services/cepService";
import * as geoService from "@/services/geocodingService";

describe("HeroSearch", () => {
  it("valida mascara e dispara onResolved", async () => {
    const onResolved = vi.fn();

    vi.spyOn(cepService, "getAddress").mockResolvedValue({
      cep: "62053760",
      street: "Rua X",
      neighborhood: "Bairro",
      city: "Sobral",
      uf: "CE",
      ibge: "2312908",
      provider: "BrasilAPI",
    } as any);

    vi.spyOn(geoService, "geocodeCityUF").mockResolvedValue({
      lat: -3.68611,
      lon: -40.34972,
    });

    render(<HeroSearch onResolved={onResolved} />);

    const input = screen.getByLabelText(/CEP/i);
    await userEvent.type(input, "62053-760");
    const btn = screen.getByRole("button", { name: /buscar/i });
    await userEvent.click(btn);

    await waitFor(() =>
      expect(onResolved).toHaveBeenCalledWith(
        expect.objectContaining({ uf: "CE" })
      )
    );
  });
});
